import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type ICampaignData = {
  month?: InputMaybe<Scalars['String']>;
  sports?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type IForecaseInput = {
  sports?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type IForecastData = {
  __typename?: 'IForecastData';
  activity?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  month?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  total_net_raised_cents?: Maybe<Scalars['Int']>;
  total_team_size?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export enum Month {
  April = 'april',
  August = 'august',
  December = 'december',
  February = 'february',
  January = 'january',
  July = 'july',
  June = 'june',
  March = 'march',
  May = 'may',
  November = 'november',
  October = 'october',
  September = 'september'
}

export type Mutation = {
  __typename?: 'Mutation';
  sampleMutation?: Maybe<SampleMutation>;
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<Array<Maybe<Scalars['String']>>>;
  campaignData?: Maybe<Scalars['JSON']>;
  forecastCampaignData?: Maybe<Array<Maybe<IForecastData>>>;
  sampleQuery?: Maybe<SampleQuery>;
};


export type QueryCampaignDataArgs = {
  option?: InputMaybe<ICampaignData>;
};


export type QueryForecastCampaignDataArgs = {
  option?: InputMaybe<IForecaseInput>;
};

export type SampleMutation = {
  __typename?: 'SampleMutation';
  msg?: Maybe<Scalars['String']>;
};

export type SampleQuery = {
  __typename?: 'SampleQuery';
  msg?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ICampaignData: ICampaignData;
  IForecaseInput: IForecaseInput;
  IForecastData: ResolverTypeWrapper<IForecastData>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Month: Month;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SampleMutation: ResolverTypeWrapper<SampleMutation>;
  SampleQuery: ResolverTypeWrapper<SampleQuery>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ICampaignData: ICampaignData;
  IForecaseInput: IForecaseInput;
  IForecastData: IForecastData;
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Mutation: {};
  Query: {};
  SampleMutation: SampleMutation;
  SampleQuery: SampleQuery;
  String: Scalars['String'];
};

export type IForecastDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['IForecastData'] = ResolversParentTypes['IForecastData']> = {
  activity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  month?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_net_raised_cents?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_team_size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  sampleMutation?: Resolver<Maybe<ResolversTypes['SampleMutation']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  activities?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  campaignData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<QueryCampaignDataArgs>>;
  forecastCampaignData?: Resolver<Maybe<Array<Maybe<ResolversTypes['IForecastData']>>>, ParentType, ContextType, Partial<QueryForecastCampaignDataArgs>>;
  sampleQuery?: Resolver<Maybe<ResolversTypes['SampleQuery']>, ParentType, ContextType>;
};

export type SampleMutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SampleMutation'] = ResolversParentTypes['SampleMutation']> = {
  msg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SampleQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SampleQuery'] = ResolversParentTypes['SampleQuery']> = {
  msg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  IForecastData?: IForecastDataResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SampleMutation?: SampleMutationResolvers<ContextType>;
  SampleQuery?: SampleQueryResolvers<ContextType>;
};

