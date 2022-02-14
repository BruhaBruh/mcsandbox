// THIS IS A GENERATED FILE, use `yarn codegen` to regenerate
/* tslint:disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER'
}

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableInt64OperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<Scalars['Long']>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  neq?: InputMaybe<Scalars['Long']>;
  ngt?: InputMaybe<Scalars['Long']>;
  ngte?: InputMaybe<Scalars['Long']>;
  nin?: InputMaybe<Array<Scalars['Long']>>;
  nlt?: InputMaybe<Scalars['Long']>;
  nlte?: InputMaybe<Scalars['Long']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableNullableOfInt64OperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  neq?: InputMaybe<Scalars['Long']>;
  ngt?: InputMaybe<Scalars['Long']>;
  ngte?: InputMaybe<Scalars['Long']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  nlt?: InputMaybe<Scalars['Long']>;
  nlte?: InputMaybe<Scalars['Long']>;
};

export type CreateEditInput = {
  cost?: InputMaybe<Scalars['Int']>;
  costBy?: InputMaybe<Scalars['String']>;
  costEnd?: InputMaybe<Scalars['Int']>;
  costStart?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  type: ProductType;
};

/** A connection to a list of items. */
export type ExecutorsConnection = {
  __typename?: 'ExecutorsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ExecutorsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ExecutorsEdge = {
  __typename?: 'ExecutorsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

export type ListComparableInt64OperationFilterInput = {
  all?: InputMaybe<ComparableInt64OperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ComparableInt64OperationFilterInput>;
  some?: InputMaybe<ComparableInt64OperationFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Orderchat;
  createProduct: Scalars['Boolean'];
  editOrder: Scalars['Boolean'];
  editProduct: Scalars['Boolean'];
  editUser: Scalars['Boolean'];
  readMessage: Scalars['Boolean'];
  removeProduct: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
};


export type MutationCreateOrderArgs = {
  productId: Scalars['Int'];
};


export type MutationCreateProductArgs = {
  input: CreateEditInput;
};


export type MutationEditOrderArgs = {
  input: OrderEditInput;
  orderId: Scalars['Int'];
};


export type MutationEditProductArgs = {
  id: Scalars['Int'];
  input: CreateEditInput;
};


export type MutationEditUserArgs = {
  frozen: Scalars['Int'];
  money: Scalars['Int'];
  status: UserStatus;
  userId: Scalars['String'];
};


export type MutationReadMessageArgs = {
  msgId: Scalars['Int'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  chatId: Scalars['Int'];
  message: Scalars['String'];
  replyMessageId?: InputMaybe<Scalars['Int']>;
};

export type Order = {
  __typename?: 'Order';
  customer: User;
  customerId?: Maybe<Scalars['String']>;
  executor?: Maybe<User>;
  executorId?: Maybe<Scalars['String']>;
  expiredAt?: Maybe<Scalars['DateTime']>;
  money: Scalars['Int'];
  orderId: Scalars['Int'];
  orderchat?: Maybe<Orderchat>;
  product: Product;
  productId: Scalars['Int'];
  status: OrderStatus;
};

export type OrderEditInput = {
  executorId?: InputMaybe<Scalars['String']>;
  expiredAtInDays?: InputMaybe<Scalars['Int']>;
  money?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<OrderStatus>;
};

export type OrderFilterInput = {
  and?: InputMaybe<Array<OrderFilterInput>>;
  customer?: InputMaybe<UserFilterInput>;
  customerId?: InputMaybe<ComparableInt64OperationFilterInput>;
  executor?: InputMaybe<UserFilterInput>;
  executorId?: InputMaybe<ComparableNullableOfInt64OperationFilterInput>;
  expiredAt?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  money?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<OrderFilterInput>>;
  orderId?: InputMaybe<ComparableInt32OperationFilterInput>;
  orderchat?: InputMaybe<OrderchatFilterInput>;
  product?: InputMaybe<ProductFilterInput>;
  productId?: InputMaybe<ComparableInt32OperationFilterInput>;
  status?: InputMaybe<OrderStatusOperationFilterInput>;
};

export type OrderSortInput = {
  customer?: InputMaybe<UserSortInput>;
  customerId?: InputMaybe<SortEnumType>;
  executor?: InputMaybe<UserSortInput>;
  executorId?: InputMaybe<SortEnumType>;
  expiredAt?: InputMaybe<SortEnumType>;
  money?: InputMaybe<SortEnumType>;
  orderId?: InputMaybe<SortEnumType>;
  orderchat?: InputMaybe<OrderchatSortInput>;
  product?: InputMaybe<ProductSortInput>;
  productId?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export enum OrderStatus {
  Expired = 'EXPIRED',
  InProgress = 'IN_PROGRESS',
  IsConsidered = 'IS_CONSIDERED',
  Rejected = 'REJECTED',
  Success = 'SUCCESS'
}

export type OrderStatusOperationFilterInput = {
  eq?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  neq?: InputMaybe<OrderStatus>;
  nin?: InputMaybe<Array<OrderStatus>>;
};

export type Orderchat = {
  __typename?: 'Orderchat';
  createdAt: Scalars['DateTime'];
  lastmessage?: Maybe<Ordermessage>;
  order: Order;
  orderId: Scalars['Int'];
  orderchatId: Scalars['Int'];
};

export type OrderchatFilterInput = {
  and?: InputMaybe<Array<OrderchatFilterInput>>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  lastmessage?: InputMaybe<OrdermessageFilterInput>;
  or?: InputMaybe<Array<OrderchatFilterInput>>;
  order?: InputMaybe<OrderFilterInput>;
  orderId?: InputMaybe<ComparableInt32OperationFilterInput>;
  orderchatId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type OrderchatSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  lastmessage?: InputMaybe<OrdermessageSortInput>;
  order?: InputMaybe<OrderSortInput>;
  orderId?: InputMaybe<SortEnumType>;
  orderchatId?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type OrderchatsConnection = {
  __typename?: 'OrderchatsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrderchatsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Orderchat>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type OrderchatsEdge = {
  __typename?: 'OrderchatsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Orderchat;
};

export type Ordermessage = {
  __typename?: 'Ordermessage';
  attachments: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  message: Scalars['String'];
  orderchatId: Scalars['Int'];
  ordermessageId: Scalars['Int'];
  owner: User;
  ownerId?: Maybe<Scalars['String']>;
  readedUserIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  replyMessage?: Maybe<Ordermessage>;
  replyMessageId?: Maybe<Scalars['Int']>;
};

export type OrdermessageFilterInput = {
  and?: InputMaybe<Array<OrdermessageFilterInput>>;
  attachments?: InputMaybe<ListStringOperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  message?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<OrdermessageFilterInput>>;
  orderchatId?: InputMaybe<ComparableInt32OperationFilterInput>;
  ordermessageId?: InputMaybe<ComparableInt32OperationFilterInput>;
  owner?: InputMaybe<UserFilterInput>;
  ownerId?: InputMaybe<ComparableInt64OperationFilterInput>;
  readedUserIds?: InputMaybe<ListComparableInt64OperationFilterInput>;
  replyMessage?: InputMaybe<OrdermessageFilterInput>;
  replyMessageId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

export type OrdermessageSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  message?: InputMaybe<SortEnumType>;
  orderchatId?: InputMaybe<SortEnumType>;
  ordermessageId?: InputMaybe<SortEnumType>;
  owner?: InputMaybe<UserSortInput>;
  ownerId?: InputMaybe<SortEnumType>;
  replyMessage?: InputMaybe<OrdermessageSortInput>;
  replyMessageId?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type OrdermessagesConnection = {
  __typename?: 'OrdermessagesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrdermessagesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Ordermessage>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type OrdermessagesEdge = {
  __typename?: 'OrdermessagesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Ordermessage;
};

/** A connection to a list of items. */
export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<OrdersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Order>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Order;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  cost?: Maybe<Scalars['Int']>;
  costBy?: Maybe<Scalars['String']>;
  costEnd?: Maybe<Scalars['Int']>;
  costStart?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  productId: Scalars['Int'];
  type: ProductType;
};

export type ProductFilterInput = {
  and?: InputMaybe<Array<ProductFilterInput>>;
  cost?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  costBy?: InputMaybe<StringOperationFilterInput>;
  costEnd?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  costStart?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  image?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProductFilterInput>>;
  productId?: InputMaybe<ComparableInt32OperationFilterInput>;
  type?: InputMaybe<ProductTypeOperationFilterInput>;
};

export type ProductSortInput = {
  cost?: InputMaybe<SortEnumType>;
  costBy?: InputMaybe<SortEnumType>;
  costEnd?: InputMaybe<SortEnumType>;
  costStart?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  image?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  productId?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
};

export enum ProductType {
  Product = 'PRODUCT',
  Service = 'SERVICE'
}

export type ProductTypeOperationFilterInput = {
  eq?: InputMaybe<ProductType>;
  in?: InputMaybe<Array<ProductType>>;
  neq?: InputMaybe<ProductType>;
  nin?: InputMaybe<Array<ProductType>>;
};

/** A connection to a list of items. */
export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ProductsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Product>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Product;
};

export type Query = {
  __typename?: 'Query';
  executors?: Maybe<ExecutorsConnection>;
  me: User;
  orderchats?: Maybe<OrderchatsConnection>;
  ordermessages?: Maybe<OrdermessagesConnection>;
  orders?: Maybe<OrdersConnection>;
  products?: Maybe<ProductsConnection>;
  user?: Maybe<User>;
  users?: Maybe<UsersConnection>;
};


export type QueryExecutorsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<UserSortInput>>;
  search?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserFilterInput>;
};


export type QueryOrderchatsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<OrderchatSortInput>>;
  where?: InputMaybe<OrderchatFilterInput>;
};


export type QueryOrdermessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  chatId: Scalars['Int'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<OrdermessageSortInput>>;
  where?: InputMaybe<OrdermessageFilterInput>;
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<OrderSortInput>>;
  where?: InputMaybe<OrderFilterInput>;
};


export type QueryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<ProductSortInput>>;
  where?: InputMaybe<ProductFilterInput>;
};


export type QueryUserArgs = {
  discordId: Scalars['String'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<UserSortInput>>;
  where?: InputMaybe<UserFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  updatedMessage: Ordermessage;
};


export type SubscriptionUpdatedMessageArgs = {
  chatId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  discordId?: Maybe<Scalars['String']>;
  frozenMoney: Scalars['Int'];
  money: Scalars['Int'];
  nickname: Scalars['String'];
  rating: Scalars['Int'];
  status: UserStatus;
  tag: Scalars['String'];
};

export type UserFilterInput = {
  and?: InputMaybe<Array<UserFilterInput>>;
  avatar?: InputMaybe<StringOperationFilterInput>;
  discordId?: InputMaybe<ComparableInt64OperationFilterInput>;
  frozenMoney?: InputMaybe<ComparableInt32OperationFilterInput>;
  money?: InputMaybe<ComparableInt32OperationFilterInput>;
  nickname?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserFilterInput>>;
  rating?: InputMaybe<ComparableInt32OperationFilterInput>;
  status?: InputMaybe<UserStatusOperationFilterInput>;
  tag?: InputMaybe<StringOperationFilterInput>;
};

export type UserSortInput = {
  avatar?: InputMaybe<SortEnumType>;
  discordId?: InputMaybe<SortEnumType>;
  frozenMoney?: InputMaybe<SortEnumType>;
  money?: InputMaybe<SortEnumType>;
  nickname?: InputMaybe<SortEnumType>;
  rating?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  tag?: InputMaybe<SortEnumType>;
};

export enum UserStatus {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Executor = 'EXECUTOR',
  SuperAdmin = 'SUPER_ADMIN'
}

export type UserStatusOperationFilterInput = {
  eq?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  neq?: InputMaybe<UserStatus>;
  nin?: InputMaybe<Array<UserStatus>>;
};

/** A connection to a list of items. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', discordId?: string | null | undefined, nickname: string, tag: string, avatar: string, rating: number, status: UserStatus, money: number, frozenMoney: number } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', discordId?: string | null | undefined, nickname: string, tag: string, avatar: string, rating: number, status: UserStatus, money: number, frozenMoney: number } | null | undefined };

export type GetUsersQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UsersConnection', edges?: Array<{ __typename?: 'UsersEdge', node: { __typename?: 'User', discordId?: string | null | undefined, nickname: string, tag: string, avatar: string, rating: number, status: UserStatus, money: number, frozenMoney: number } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean } } | null | undefined };

export type ProductsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<ProductFilterInput>;
  order?: InputMaybe<Array<ProductSortInput> | ProductSortInput>;
}>;


export type ProductsQuery = { __typename?: 'Query', products?: { __typename?: 'ProductsConnection', edges?: Array<{ __typename?: 'ProductsEdge', node: { __typename?: 'Product', productId: number, image: string, name: string, description: string, cost?: number | null | undefined, costBy?: string | null | undefined, costStart?: number | null | undefined, costEnd?: number | null | undefined, type: ProductType } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } | null | undefined };

export type CreateProductMutationVariables = Exact<{
  name: Scalars['String'];
  cost?: InputMaybe<Scalars['Int']>;
  costBy?: InputMaybe<Scalars['String']>;
  costStart?: InputMaybe<Scalars['Int']>;
  costEnd?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  image: Scalars['String'];
  type: ProductType;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: boolean };

export type EditProductMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  cost?: InputMaybe<Scalars['Int']>;
  costBy?: InputMaybe<Scalars['String']>;
  costStart?: InputMaybe<Scalars['Int']>;
  costEnd?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  image: Scalars['String'];
  type: ProductType;
}>;


export type EditProductMutation = { __typename?: 'Mutation', editProduct: boolean };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutation', removeProduct: boolean };

export type CreateOrderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Orderchat', orderId: number, orderchatId: number } };

export type OrderHistoryQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<OrderFilterInput>;
}>;


export type OrderHistoryQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersConnection', edges?: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Order', orderId: number, status: OrderStatus, money: number, expiredAt?: any | null | undefined, orderchat?: { __typename?: 'Orderchat', orderchatId: number } | null | undefined, product: { __typename?: 'Product', name: string, type: ProductType }, customer: { __typename?: 'User', discordId?: string | null | undefined, tag: string }, executor?: { __typename?: 'User', discordId?: string | null | undefined, nickname: string } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } | null | undefined };

export type AdminOrdersQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<OrderFilterInput>;
}>;


export type AdminOrdersQuery = { __typename?: 'Query', orders?: { __typename?: 'OrdersConnection', edges?: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Order', orderId: number, executorId?: string | null | undefined, money: number, expiredAt?: any | null | undefined, status: OrderStatus, customer: { __typename?: 'User', discordId?: string | null | undefined, avatar: string, tag: string }, executor?: { __typename?: 'User', discordId?: string | null | undefined, avatar: string, nickname: string, tag: string } | null | undefined, product: { __typename?: 'Product', name: string }, orderchat?: { __typename?: 'Orderchat', orderchatId: number } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } | null | undefined };

export type ExecutorsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<UserFilterInput>;
  order?: InputMaybe<Array<UserSortInput> | UserSortInput>;
}>;


export type ExecutorsQuery = { __typename?: 'Query', executors?: { __typename?: 'ExecutorsConnection', edges?: Array<{ __typename?: 'ExecutorsEdge', node: { __typename?: 'User', discordId?: string | null | undefined, avatar: string, nickname: string, rating: number } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean } } | null | undefined };

export type EditOrderMutationVariables = Exact<{
  id: Scalars['Int'];
  input: OrderEditInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', editOrder: boolean };

export type EditUserMutationVariables = Exact<{
  id: Scalars['String'];
  status: UserStatus;
  money: Scalars['Int'];
  frozen: Scalars['Int'];
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: boolean };

export type ChatsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
}>;


export type ChatsQuery = { __typename?: 'Query', orderchats?: { __typename?: 'OrderchatsConnection', edges?: Array<{ __typename?: 'OrderchatsEdge', node: { __typename?: 'Orderchat', orderchatId: number, order: { __typename?: 'Order', orderId: number, money: number, product: { __typename?: 'Product', name: string } }, lastmessage?: { __typename?: 'Ordermessage', readedUserIds?: Array<string | null | undefined> | null | undefined, message: string, owner: { __typename?: 'User', discordId?: string | null | undefined, avatar: string, nickname: string } } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage: boolean } } | null | undefined };

export type MessagesQueryVariables = Exact<{
  id: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type MessagesQuery = { __typename?: 'Query', ordermessages?: { __typename?: 'OrdermessagesConnection', edges?: Array<{ __typename?: 'OrdermessagesEdge', node: { __typename?: 'Ordermessage', ordermessageId: number, ownerId?: string | null | undefined, readedUserIds?: Array<string | null | undefined> | null | undefined, attachments: Array<string>, message: string, createdAt: any, replyMessage?: { __typename?: 'Ordermessage', message: string, owner: { __typename?: 'User', discordId?: string | null | undefined, avatar: string } } | null | undefined, owner: { __typename?: 'User', discordId?: string | null | undefined, avatar: string } } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } | null | undefined };

export type SendMessageMutationVariables = Exact<{
  id: Scalars['Int'];
  message: Scalars['String'];
  replyId?: InputMaybe<Scalars['Int']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type ReadMessageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: boolean };

export type UpdatedChatMessageSubscriptionVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UpdatedChatMessageSubscription = { __typename?: 'Subscription', updatedMessage: { __typename?: 'Ordermessage', ordermessageId: number, ownerId?: string | null | undefined, readedUserIds?: Array<string | null | undefined> | null | undefined, attachments: Array<string>, message: string, createdAt: any, replyMessage?: { __typename?: 'Ordermessage', message: string, owner: { __typename?: 'User', discordId?: string | null | undefined, avatar: string } } | null | undefined, owner: { __typename?: 'User', discordId?: string | null | undefined, avatar: string } } };


export const MeDocument = gql`
    query me {
  me {
    discordId
    nickname
    tag
    avatar
    rating
    status
    money
    frozenMoney
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: String!) {
  user(discordId: $id) {
    discordId
    nickname
    tag
    avatar
    rating
    status
    money
    frozenMoney
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($after: String) {
  users(after: $after, first: 50, order: {discordId: DESC}) {
    edges {
      node {
        discordId
        nickname
        tag
        avatar
        rating
        status
        money
        frozenMoney
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const ProductsDocument = gql`
    query products($after: String, $where: ProductFilterInput, $order: [ProductSortInput!]) {
  products(after: $after, first: 50, where: $where, order: $order) {
    edges {
      node {
        productId
        image
        name
        description
        cost
        costBy
        costStart
        costEnd
        type
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      where: // value for 'where'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const CreateProductDocument = gql`
    mutation createProduct($name: String!, $cost: Int, $costBy: String, $costStart: Int, $costEnd: Int, $description: String!, $image: String!, $type: ProductType!) {
  createProduct(
    input: {name: $name, cost: $cost, costBy: $costBy, costEnd: $costEnd, costStart: $costStart, description: $description, image: $image, type: $type}
  )
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      name: // value for 'name'
 *      cost: // value for 'cost'
 *      costBy: // value for 'costBy'
 *      costStart: // value for 'costStart'
 *      costEnd: // value for 'costEnd'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const EditProductDocument = gql`
    mutation editProduct($id: Int!, $name: String!, $cost: Int, $costBy: String, $costStart: Int, $costEnd: Int, $description: String!, $image: String!, $type: ProductType!) {
  editProduct(
    id: $id
    input: {name: $name, cost: $cost, costBy: $costBy, costEnd: $costEnd, costStart: $costStart, description: $description, image: $image, type: $type}
  )
}
    `;
export type EditProductMutationFn = Apollo.MutationFunction<EditProductMutation, EditProductMutationVariables>;

/**
 * __useEditProductMutation__
 *
 * To run a mutation, you first call `useEditProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProductMutation, { data, loading, error }] = useEditProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      cost: // value for 'cost'
 *      costBy: // value for 'costBy'
 *      costStart: // value for 'costStart'
 *      costEnd: // value for 'costEnd'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useEditProductMutation(baseOptions?: Apollo.MutationHookOptions<EditProductMutation, EditProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProductMutation, EditProductMutationVariables>(EditProductDocument, options);
      }
export type EditProductMutationHookResult = ReturnType<typeof useEditProductMutation>;
export type EditProductMutationResult = Apollo.MutationResult<EditProductMutation>;
export type EditProductMutationOptions = Apollo.BaseMutationOptions<EditProductMutation, EditProductMutationVariables>;
export const RemoveProductDocument = gql`
    mutation removeProduct($id: Int!) {
  removeProduct(id: $id)
}
    `;
export type RemoveProductMutationFn = Apollo.MutationFunction<RemoveProductMutation, RemoveProductMutationVariables>;

/**
 * __useRemoveProductMutation__
 *
 * To run a mutation, you first call `useRemoveProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProductMutation, { data, loading, error }] = useRemoveProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProductMutation, RemoveProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProductMutation, RemoveProductMutationVariables>(RemoveProductDocument, options);
      }
export type RemoveProductMutationHookResult = ReturnType<typeof useRemoveProductMutation>;
export type RemoveProductMutationResult = Apollo.MutationResult<RemoveProductMutation>;
export type RemoveProductMutationOptions = Apollo.BaseMutationOptions<RemoveProductMutation, RemoveProductMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($id: Int!) {
  createOrder(productId: $id) {
    orderId
    orderchatId
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const OrderHistoryDocument = gql`
    query orderHistory($after: String, $where: OrderFilterInput) {
  orders(after: $after, first: 50, order: {orderId: DESC}, where: $where) {
    edges {
      node {
        orderId
        status
        money
        expiredAt
        orderchat {
          orderchatId
        }
        product {
          name
          type
          name
        }
        customer {
          discordId
          tag
        }
        executor {
          discordId
          nickname
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useOrderHistoryQuery__
 *
 * To run a query within a React component, call `useOrderHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderHistoryQuery({
 *   variables: {
 *      after: // value for 'after'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useOrderHistoryQuery(baseOptions?: Apollo.QueryHookOptions<OrderHistoryQuery, OrderHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderHistoryQuery, OrderHistoryQueryVariables>(OrderHistoryDocument, options);
      }
export function useOrderHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderHistoryQuery, OrderHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderHistoryQuery, OrderHistoryQueryVariables>(OrderHistoryDocument, options);
        }
export type OrderHistoryQueryHookResult = ReturnType<typeof useOrderHistoryQuery>;
export type OrderHistoryLazyQueryHookResult = ReturnType<typeof useOrderHistoryLazyQuery>;
export type OrderHistoryQueryResult = Apollo.QueryResult<OrderHistoryQuery, OrderHistoryQueryVariables>;
export const AdminOrdersDocument = gql`
    query adminOrders($after: String, $where: OrderFilterInput) {
  orders(after: $after, first: 50, order: {orderId: DESC}, where: $where) {
    edges {
      node {
        orderId
        customer {
          discordId
          avatar
          tag
        }
        executorId
        executor {
          discordId
          avatar
          nickname
          avatar
          tag
        }
        product {
          name
        }
        money
        expiredAt
        status
        orderchat {
          orderchatId
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useAdminOrdersQuery__
 *
 * To run a query within a React component, call `useAdminOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminOrdersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAdminOrdersQuery(baseOptions?: Apollo.QueryHookOptions<AdminOrdersQuery, AdminOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(AdminOrdersDocument, options);
      }
export function useAdminOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminOrdersQuery, AdminOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(AdminOrdersDocument, options);
        }
export type AdminOrdersQueryHookResult = ReturnType<typeof useAdminOrdersQuery>;
export type AdminOrdersLazyQueryHookResult = ReturnType<typeof useAdminOrdersLazyQuery>;
export type AdminOrdersQueryResult = Apollo.QueryResult<AdminOrdersQuery, AdminOrdersQueryVariables>;
export const ExecutorsDocument = gql`
    query executors($search: String, $after: String, $where: UserFilterInput, $order: [UserSortInput!]) {
  executors(
    search: $search
    after: $after
    first: 50
    where: $where
    order: $order
  ) {
    edges {
      node {
        discordId
        avatar
        nickname
        rating
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useExecutorsQuery__
 *
 * To run a query within a React component, call `useExecutorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExecutorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExecutorsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      after: // value for 'after'
 *      where: // value for 'where'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useExecutorsQuery(baseOptions?: Apollo.QueryHookOptions<ExecutorsQuery, ExecutorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExecutorsQuery, ExecutorsQueryVariables>(ExecutorsDocument, options);
      }
export function useExecutorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExecutorsQuery, ExecutorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExecutorsQuery, ExecutorsQueryVariables>(ExecutorsDocument, options);
        }
export type ExecutorsQueryHookResult = ReturnType<typeof useExecutorsQuery>;
export type ExecutorsLazyQueryHookResult = ReturnType<typeof useExecutorsLazyQuery>;
export type ExecutorsQueryResult = Apollo.QueryResult<ExecutorsQuery, ExecutorsQueryVariables>;
export const EditOrderDocument = gql`
    mutation editOrder($id: Int!, $input: OrderEditInput!) {
  editOrder(orderId: $id, input: $input)
}
    `;
export type EditOrderMutationFn = Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>;

/**
 * __useEditOrderMutation__
 *
 * To run a mutation, you first call `useEditOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderMutation, { data, loading, error }] = useEditOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderMutation, EditOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderMutation, EditOrderMutationVariables>(EditOrderDocument, options);
      }
export type EditOrderMutationHookResult = ReturnType<typeof useEditOrderMutation>;
export type EditOrderMutationResult = Apollo.MutationResult<EditOrderMutation>;
export type EditOrderMutationOptions = Apollo.BaseMutationOptions<EditOrderMutation, EditOrderMutationVariables>;
export const EditUserDocument = gql`
    mutation editUser($id: String!, $status: UserStatus!, $money: Int!, $frozen: Int!) {
  editUser(userId: $id, status: $status, money: $money, frozen: $frozen)
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *      money: // value for 'money'
 *      frozen: // value for 'frozen'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const ChatsDocument = gql`
    query chats($after: String) {
  orderchats(after: $after, first: 50, order: {orderchatId: DESC}) {
    edges {
      node {
        orderchatId
        order {
          orderId
          money
          product {
            name
          }
        }
        lastmessage {
          readedUserIds
          message
          owner {
            discordId
            avatar
            nickname
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *      after: // value for 'after'
 *   },
 * });
 */
export function useChatsQuery(baseOptions?: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const MessagesDocument = gql`
    query messages($id: Int!, $after: String) {
  ordermessages(chatId: $id, first: 50, after: $after) {
    edges {
      node {
        ordermessageId
        ownerId
        readedUserIds
        attachments
        message
        createdAt
        replyMessage {
          message
          owner {
            discordId
            avatar
          }
        }
        owner {
          discordId
          avatar
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($id: Int!, $message: String!, $replyId: Int) {
  sendMessage(chatId: $id, message: $message, replyMessageId: $replyId)
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      message: // value for 'message'
 *      replyId: // value for 'replyId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const ReadMessageDocument = gql`
    mutation readMessage($id: Int!) {
  readMessage(msgId: $id)
}
    `;
export type ReadMessageMutationFn = Apollo.MutationFunction<ReadMessageMutation, ReadMessageMutationVariables>;

/**
 * __useReadMessageMutation__
 *
 * To run a mutation, you first call `useReadMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readMessageMutation, { data, loading, error }] = useReadMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReadMessageMutation(baseOptions?: Apollo.MutationHookOptions<ReadMessageMutation, ReadMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadMessageMutation, ReadMessageMutationVariables>(ReadMessageDocument, options);
      }
export type ReadMessageMutationHookResult = ReturnType<typeof useReadMessageMutation>;
export type ReadMessageMutationResult = Apollo.MutationResult<ReadMessageMutation>;
export type ReadMessageMutationOptions = Apollo.BaseMutationOptions<ReadMessageMutation, ReadMessageMutationVariables>;
export const UpdatedChatMessageDocument = gql`
    subscription updatedChatMessage($id: Int!) {
  updatedMessage(chatId: $id) {
    ordermessageId
    ownerId
    readedUserIds
    attachments
    message
    createdAt
    replyMessage {
      message
      owner {
        discordId
        avatar
      }
    }
    owner {
      discordId
      avatar
    }
  }
}
    `;

/**
 * __useUpdatedChatMessageSubscription__
 *
 * To run a query within a React component, call `useUpdatedChatMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdatedChatMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdatedChatMessageSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatedChatMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<UpdatedChatMessageSubscription, UpdatedChatMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdatedChatMessageSubscription, UpdatedChatMessageSubscriptionVariables>(UpdatedChatMessageDocument, options);
      }
export type UpdatedChatMessageSubscriptionHookResult = ReturnType<typeof useUpdatedChatMessageSubscription>;
export type UpdatedChatMessageSubscriptionResult = Apollo.SubscriptionResult<UpdatedChatMessageSubscription>;