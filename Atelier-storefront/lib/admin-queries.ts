/**
 * GraphQL Queries and Mutations for Shopify Admin API
 */

// ==================== QUERIES ====================

export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          handle
          status
          description
          vendor
          productType
          createdAt
          updatedAt
          totalInventory
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
                sku
                inventoryQuantity
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_QUERY = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      status
      description
      vendor
      productType
      createdAt
      updatedAt
      totalInventory
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            sku
            inventoryQuantity
            availableForSale
          }
        }
      }
    }
  }
`

export const GET_CUSTOMERS_QUERY = `
  query getCustomers($first: Int!, $after: String) {
    customers(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          firstName
          lastName
          email
          phone
          createdAt
          updatedAt
          numberOfOrders
          totalSpent
          addresses {
            address1
            city
            province
            country
            zip
          }
        }
      }
    }
  }
`

export const GET_CUSTOMER_QUERY = `
  query getCustomer($id: ID!) {
    customer(id: $id) {
      id
      firstName
      lastName
      email
      phone
      createdAt
      updatedAt
      numberOfOrders
      totalSpent
      addresses {
        address1
        city
        province
        country
        zip
      }
      orders(first: 10) {
        edges {
          node {
            id
            name
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            createdAt
            fulfillmentStatus
            financialStatus
          }
        }
      }
    }
  }
`

export const GET_ORDERS_QUERY = `
  query getOrders($first: Int!, $after: String) {
    orders(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          email
          createdAt
          updatedAt
          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }
          fulfillmentStatus
          financialStatus
          customer {
            id
            firstName
            lastName
            email
          }
          lineItems(first: 10) {
            edges {
              node {
                id
                title
                quantity
                originalUnitPriceSet {
                  shopMoney {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GET_ORDER_QUERY = `
  query getOrder($id: ID!) {
    order(id: $id) {
      id
      name
      email
      createdAt
      updatedAt
      totalPriceSet {
        shopMoney {
          amount
          currencyCode
        }
      }
      fulfillmentStatus
      financialStatus
      customer {
        id
        firstName
        lastName
        email
      }
      shippingAddress {
        address1
        city
        province
        country
        zip
      }
      lineItems(first: 50) {
        edges {
          node {
            id
            title
            quantity
            originalUnitPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            variant {
              id
              title
              sku
            }
          }
        }
      }
    }
  }
`

export const GET_SHOP_STATS_QUERY = `
  query getShopStats {
    shop {
      name
      email
      currencyCode
    }
    products(first: 1) {
      pageInfo {
        hasNextPage
      }
    }
  }
`

// ==================== MUTATIONS ====================

export const UPDATE_PRODUCT_VARIANT_PRICE_MUTATION = `
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      productVariant {
        id
        price
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const UPDATE_PRODUCT_VARIANT_INVENTORY_MUTATION = `
  mutation inventorySetOnHandQuantities($input: InventorySetOnHandQuantitiesInput!) {
    inventorySetOnHandQuantities(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`

export const CREATE_PRODUCT_MUTATION = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const UPDATE_PRODUCT_MUTATION = `
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`

