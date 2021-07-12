import { ApolloClient, InMemoryCache } from '@apollo/client'
import { favourites } from '../graphql/vars'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favourites: {
            read(){
              return favourites()
            }
          }
        }
      }
    }
  })
})

export default client