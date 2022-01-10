import {dev} from '$app/env';
import { variables } from '$lib/variables';
import imageUrlBuilder from '@sanity/image-url';
import type {SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlocks, } from '@portabletext/svelte/ptTypes';

export type {SanityImageSource} from '@sanity/image-url/lib/types/types';

const {projectId, dataset, version} = variables.sanity;
const apiVersion = version;
const useCdn = !dev;
const apiHost = 'https://api.sanity.io';
const sanityUrl = `https://${projectId}.${useCdn ? 'apicdn.sanity.io' : 'api.sanity.io'}/${apiVersion}/data/query/${dataset}`;

export const imageBuilder = imageUrlBuilder(
  {
    clientConfig: {
      dataset,
      projectId,
      apiHost,
    }
  }
);

const encodeQuery = query => encodeURIComponent(
  query
  // remove all whitespace
  .replace(/\s+/g, '')
  // repair _ref in tags due to white space removal
  .replace(/_refintags/g, '_ref in tags')
);

export async function getRecipeList(fetch: Fetch) {
  const query = encodeQuery(`
  *[_type=='recipe' && defined($all) && defined(mainImage)] | order(publishedAt desc){
    'slug': slug.current,
    mainImage,
    name,
    description,
    publishedAt
  }
  `);
  const url = `${sanityUrl}?query=${query}&$all="publishedAt"`;  
  const data = await fetch(url);
  const json = await data.json();
  const recipes: RecipeListing[] = json.result;
  return recipes;
}

const richTextExpansion = `...,
children[]{
  ...,
  _type == 'affiliateProductReference' => {
    'data': *[_id == ^._ref][0]{
      name,
      imageUrl,
      productUrl,
    }, 
  },
},
markDefs[]{
  ...,
  _type == 'internalLink' => {
    reference {
      _type,
      _ref,
      _weak,
      'data': *[_id == ^._ref][0]{
        _type,
        'slug': slug.current,
      },
    },
  },
},`;

const foodExpansion = `_id,
description,
fdc_id,
nutrients[]{amount,name,unit_name},
portions,
productSuggestion->{imageUrl,name,productUrl},
notes[]{
  ${richTextExpansion}
},
`;

const richTextStepsExpansion = `
_type=='stepHeader' => {...},
_type=='step' => {
  ...,
  instructions[]{
    ${richTextExpansion}
  }
},
`;

export async function getRecipeDataBySlug(slug: string, fetch: Fetch) {
  const rawQuery = `
  *[_type=='recipe' && slug.current==$slug][0]{
    _type,

    _id,

    author->{name, bio, image, 'slug': slug.current},
    
    name,

    "headerTags": headerTags[]->value,

    mainImage,

    secondaryImage,

    description,

    pinterestImage,

    carbImage,

    post[]{
      ${richTextExpansion}
    },

    postClosing[]{
      ${richTextExpansion}
    },

    affiliateProducts[]->{_id,imageUrl,name,productUrl},

    'alsoLike': alsoLikeTags[]{
      'recipes': *[_type=='recipe' && ^._ref in tags[]._ref && $slug != slug.current]{
        'slug': slug.current,
        'image': mainImage,
        'name': name,
      }
    },

    'serveWith': serveWithTags[]{
      'recipes': *[_type=='recipe' && ^._ref in tags[]._ref && $slug != slug.current]{
        'slug': slug.current,
        'image': mainImage,
        'name': name,
      }
    },

    serveWithName,

    gallery,

    squareIGImage,

    publishedAt,

    tags[]->{category,value},

    prepTime, cookTime, totalTime,

    totalWeight, totalServings, yieldUnit,

    ingredients[]{
      _key,
      _type,
      _type == 'ingredientHeader' => { header, },
      _type == 'ingredient' => {
        ...,
        food->{
          _type,
          _type == 'food' => {
            ${foodExpansion}
          },
          _type == 'recipe' => {
            ingredients[]{
              _key,
              _type,
              _type == 'ingredientHeader' => { header, },
              _type == 'ingredient' => {
                ...,
                food->{
                  ${foodExpansion}
                },
              },
            }
          },
        },
      },
    },

    steps[]{
     ${richTextStepsExpansion}
      _type=='reference' => {
        _key,
        _type,
        "data": *[_id == ^._ref][0]{
          _id,
          _type,
          _type=='recipe' => {
            name,
            steps[]{
              ${richTextStepsExpansion}
            }
          }
        }
      }
    },

    'foodScale': {
      'nutrition': *[_id=='19a2dabd-4db8-4b1e-bb2a-0d792159ad0e'][0]{ imageUrl, productUrl },
      'postal': *[_id=='35407a6e-4ff0-4853-a795-8b3d44622ba8'][0]{ imageUrl, productUrl },
    },
  }
  `;

  const query = encodeQuery(rawQuery);
  const url = `${sanityUrl}?query=${query}&$slug="${slug}"`;    

  const data = await fetch(url);
  const json = await data.json();
  
  const {ingredients=[], steps=[], alsoLike=[], serveWith=[], ...restRecipe} = json.result as RecipeDataInternal;
  
  console.log(restRecipe.foodScale);

  const recipe: RecipeData = {    
    ingredients: reduceIngredients(ingredients || []),
    steps: reduceSteps(steps || []),    
    alsoLike: reduceRecipeLinkCollection(alsoLike || []),
    serveWith: reduceRecipeLinkCollection(serveWith || []),
    ...restRecipe,
  };
  return recipe;
}

interface RecipeDataInternal {
  _type: 'recipe';
  author: Contributor;
  cookTime: number;
  description: string;
  publishedAt: string;
  ingredients: (IngredientData|IngredientHeader)[];
  mainImage: ImageData;
  name: string;
  pinterestImage: ImageData;
  carbImage: ImageData;
  squareIGImage: ImageData;
  portions: PortionData[];
  post: BlockData;
  postClosing: BlockData;
  prepTime: number;  
  seasons: Season[];
  secondaryImage: ImageData;
  slug: { current: string };
  steps: (StepHeader | Step | StepReference)[];
  tags: {category: string; value: string}[];
  headerTags: string[];
  totalTime: number;
  totalWeight: number;
  totalServings: number; 
  yieldUnit: string; 
  affiliateProducts: AffiliateData[];
  alsoLike: RecipeLinkCollection[];
  serveWith: RecipeLinkCollection[];
  serveWithName: string;
  gallery: ImageData[];
  foodScale: FoodScale;
}

export interface FoodScale {
  nutrition: { imageUrl: string; productUrl: string };
  postal: { imageUrl: string; productUrl: string };
}

export interface Contributor {
  name: string;
  bio: BlockData;
  image: ImageData;
  slug: string;
}

export interface StepGroup {
  key: string;
  header: string;
  steps: Step[];
}

type RecipeInternalExcludeProps = 'ingredients' | 'steps' | 'alsoLike' | 'serveWith';
export interface RecipeData extends Omit<RecipeDataInternal, RecipeInternalExcludeProps> {
  ingredients: IngredientGroup[];
  steps: StepGroup[];
  serveWith: RelatedLink[];
  alsoLike: RelatedLink[];
}

export type BlockData = PortableTextBlocks;

export interface ImageData {
  alt: string;
  caption: string;
  asset: SanityImageSource;
  crop: {
    _type: string;
    bottom: number;
    left: number;
    right: number;
    top: number;
  },
  hotspot: {
    _type: string;
    height: number;
    width: number;
    x: number;
    y: number;
  }
}

export interface PortionData {
  amount: number;
  gram_weight: number;
  modifier?: string;
  portion_description?: string;
  unit: string;
}

export interface NutrientData {
  amount: number;
  name: string;
  unit_name: string;
}

export interface IngredientHeader {
  _type: 'ingredientHeader';
  _key: string;
  header: string;
}

export interface FoodData {
  _type: 'food';
  description: string;
  fdc_id: number;
  nutrients: NutrientData[];
  portions: PortionData[];
  optional: boolean;
  unit: string;
  productSuggestion?: AffiliateData;
  notes?: BlockData;
}

export interface IngredientData {
  _type: 'ingredient';
  _key: string;
  amount: number;
  displayName: string;
  displayModifier: string;  
  divisor: number;
  modifier: string;
  optional: boolean;  
  unit: string;
  food: FoodData | RecipeData;
}

export type Season = 'summer' | 'winter' | 'spring' | 'fall';

export interface Tag {
  category: string;
  value: string;
}

export interface Step {
  _key: string;
  _type: 'step';
  instructions: BlockData;
}

export interface StepReference {
  _key: string;
  _type: 'reference';
  data: {
    _id: string;
    _type: 'recipe';
    name: string;
    steps: Step[];
  }
}

export interface StepHeader {
  _key: string;
  _type: 'stepHeader';
  header: string;
}

export interface StepGroup {
  key: string;
  header: string;
  steps: Step[];
}

export interface IngredientGroup {
  key: string;
  header: string;
  ingredients: IngredientData[];
}

export interface RecipeListing {
  mainImage: ImageData;
  slug: string;
  name: string;
  description: string;
  _id: string;
}

export interface AffiliateData {
  _id: string;   
  imageUrl: string; // actually html code here
  name: string;
  productUrl: string;
}

export interface RelatedLink {
  image: ImageData;
  href: string;
  name: string;
}
interface RecipeLinkCollection {
  recipes: {
    image: ImageData;
    slug: string;
    name: string;
  }[];
}

function reduceIngredients(
  data: (IngredientData | IngredientHeader)[], 
  scaleNumerator = 1,
  scaleDenominator = 1,
  groups: IngredientGroup[] = [],  
  currentGroup: IngredientGroup = {header: '', ingredients: [], key: 'empty'}
): IngredientGroup[] {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (item._type === 'ingredientHeader') {
      currentGroup = {
        key: item._key,
        header: item.header,
        ingredients: [],
      }
      groups.push(currentGroup);
    } else {
      if (item.food._type === 'recipe') {
        // the api needs to convert recipe data internal to recipe data
        // this means that we need to process the ingredients of the internal representation
        const food = (item.food as unknown) as RecipeDataInternal; 
        
        // sub-recipes do not need optional ingredients
        const foodIngredients = food.ingredients.filter(f => f._type === 'ingredient' && !f.optional);     
        reduceIngredients(foodIngredients, item.amount, item.divisor, groups, currentGroup);
      } else {
        item.amount *= scaleNumerator;
        item.divisor *= scaleDenominator;              
        currentGroup.ingredients.push(item)
      }
    }
  }

  if (groups.length === 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function reduceSteps(
  data: (Step | StepHeader | StepReference)[],
  groups: StepGroup[] = [],
  currentGroup: StepGroup = {header: '', steps: [], key: 'empty'}
): StepGroup[] {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (item._type === 'stepHeader') {
      currentGroup = {
        key: item._key,
        header: item.header,
        steps: [],
      }
      groups.push(currentGroup);
    } else if(item._type === 'reference') {
      const ref = item.data;
      if (ref._type === 'recipe') {
        reduceSteps(ref.steps.slice(0, -1), groups, currentGroup);
      }
    } else {
      currentGroup.steps.push(item)
    }
  }

  if (groups.length === 0) {
    groups.push(currentGroup);
  }

  return groups;
}

function reduceRecipeLinkCollection(data: RecipeLinkCollection[]) {
  const uniqueSet = new Set<string>();
  const collection: RelatedLink[] = [];
  for(let col = 0; col < data.length; col++) {
    const {recipes} = data[col];
    for(let i = 0; i < recipes.length; i++) {
      const {image, slug, name} = recipes[i];      
      if (!uniqueSet.has(slug)) {
        uniqueSet.add(slug);
        collection.push({image, href: `/recipes/${slug}`, name: name});
      }      
    }
  }
  return collection;
}

