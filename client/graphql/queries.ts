import gql from "graphql-tag";

export const ME_QUERY = gql`
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

export const GET_USER_QUERY = gql`
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

export const GET_USERS_QUERY = gql`
  query getUsers($after: String) {
    users(after: $after, first: 50, order: { discordId: DESC }) {
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

export const GET_PRODUCTS_QUERY = gql`
  query products(
    $after: String
    $where: ProductFilterInput
    $order: [ProductSortInput!]
  ) {
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

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct(
    $name: String!
    $cost: Int
    $costBy: String
    $costStart: Int
    $costEnd: Int
    $description: String!
    $image: String!
    $type: ProductType!
  ) {
    createProduct(
      input: {
        name: $name
        cost: $cost
        costBy: $costBy
        costEnd: $costEnd
        costStart: $costStart
        description: $description
        image: $image
        type: $type
      }
    )
  }
`;

export const EDIT_PRODUCT_MUTATION = gql`
  mutation editProduct(
    $id: Int!
    $name: String!
    $cost: Int
    $costBy: String
    $costStart: Int
    $costEnd: Int
    $description: String!
    $image: String!
    $type: ProductType!
  ) {
    editProduct(
      id: $id
      input: {
        name: $name
        cost: $cost
        costBy: $costBy
        costEnd: $costEnd
        costStart: $costStart
        description: $description
        image: $image
        type: $type
      }
    )
  }
`;

export const REMOVE_PRODUCT_MUTATION = gql`
  mutation removeProduct($id: Int!) {
    removeProduct(id: $id)
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($id: Int!) {
    createOrder(productId: $id) {
      orderId
      orderchatId
    }
  }
`;

export const GET_ORDER_HISTORY_QUERY = gql`
  query orderHistory($after: String, $where: OrderFilterInput) {
    orders(after: $after, first: 50, order: { orderId: DESC }, where: $where) {
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

export const GET_ADMIN_ORDERS_QUERY = gql`
  query adminOrders($after: String, $where: OrderFilterInput) {
    orders(after: $after, first: 50, order: { orderId: DESC }, where: $where) {
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

export const GET_EXECUTORS_QUERY = gql`
  query executors(
    $search: String
    $after: String
    $where: UserFilterInput
    $order: [UserSortInput!]
  ) {
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

export const EDIT_ORDER_MUTATION = gql`
  mutation editOrder($id: Int!, $input: OrderEditInput!) {
    editOrder(orderId: $id, input: $input)
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation editUser(
    $id: String!
    $status: UserStatus!
    $money: Int!
    $frozen: Int!
  ) {
    editUser(userId: $id, status: $status, money: $money, frozen: $frozen)
  }
`;

export const GET_CHATS_QUERY = gql`
  query chats($after: String) {
    orderchats(after: $after, first: 50, order: { orderchatId: DESC }) {
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

export const GET_CHAT_MESSAGES_QUERY = gql`
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

export const SEND_CHAT_MESSAGE_MUTATION = gql`
  mutation sendMessage($id: Int!, $message: String!, $replyId: Int) {
    sendMessage(chatId: $id, message: $message, replyMessageId: $replyId)
  }
`;

export const READ_CHAT_MESSAGE_MUTATION = gql`
  mutation readMessage($id: Int!) {
    readMessage(msgId: $id)
  }
`;

export const UPDATED_CHAT_MESSAGE_SUBSCRIPTION = gql`
  subscription updatedChatMessage($id: Int!) {
    updatedMessage(chatId: $id) {
      ordermessageId
      ownerId
      readedUserIds
      attachments
      message
      createdAt
      replyMessageId
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
