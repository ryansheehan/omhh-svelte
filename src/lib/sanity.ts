import {dev} from '$app/env';
import { variables } from '$lib/variables';
import imageUrlBuilder from '@sanity/image-url';
import type {SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlocks, } from '@portabletext/svelte/ptTypes';

export type {SanityImageSource} from '@sanity/image-url/lib/types/types';

const {projectId, dataset} = variables;
const apiVersion = 'v2021-08-15';
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

const encodeQuery = query => encodeURIComponent(query.replace(/\s+/g, ''));

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

const richTextExpansion = `
...,
children[]{
  ...,
  _type=='affiliateProductReference' => {
    _key,
    _ref,
    _type,
    _weak,
    'data': *[_id == ^._ref][0]{
      name,
      imageUrl,
      productUrl,
    }
  }
},
markDefs[]{
  ...,
  _type=='internalLink' => {
    ...,
    reference {
      ...,
      'data': *[_id == ^._ref][0]{
        _type,
        'slug': slug.current,
      }
    }
  }
}
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
    ...,
    author->,
    ingredients[]{
      ...,
      food->{
        ...,
        ingredients [] {
          ...,
          food->
        }
      }   
    },
    affiliateProducts[]->{_id, imageUrl, name, productUrl},
    post[]{
      ${richTextExpansion}
    },
    postClosing[]{
      ${richTextExpansion}
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
    "headerTags": headerTags[]->value,
    tags[]->{category,value},
  }
  `;
  const query = encodeQuery(rawQuery);
  const url = `${sanityUrl}?query=${query}&$slug="${slug}"`;  
  const data = await fetch(url);
  const json = await data.json();
  
  const {ingredients=[], steps=[], ...restRecipe} = json.result as RecipeDataInternal;
  const recipe: RecipeData = {    
    ingredients: reduceIngredients(ingredients),
    steps: reduceSteps(steps),    
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
  pinterestImageAlt: ImageData;
  squareIGImage: ImageData;
  portions: PortionData[];
  post: BlockData;
  postClosing: BlockData;
  prepTime: number;
  relatedContent: {_type: string; slug: string;}[];
  seasons: Season[];
  secondaryImage: ImageData;
  slug: { current: string };
  steps: (StepHeader | Step | StepReference)[];
  tags: {category: string; value: string}[];
  headerTags: string[];
  totalTime: number;
  totalWeight: number;
  totalServings: number;
  affiliateProducts: AffiliateData[];
}

export interface Contributor {
  name: string;
  bio: BlockData;
  image: SanityImageSource;
  slug: { current: string };
}

export interface StepGroup {
  key: string;
  header: string;
  steps: Step[];
}

export interface RecipeData extends Omit<RecipeDataInternal, 'ingredients' | 'steps'> {
  ingredients: IngredientGroup[];
  steps: StepGroup[];
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

