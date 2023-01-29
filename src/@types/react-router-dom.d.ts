export * from 'react-router-dom';

declare module 'react-router-dom' {
  interface IndexRouteObject {
    permission?: string[]
  }
  interface NonIndexRouteObject {
    permission?: string[]
  }
  interface PathRouteProps {
    permission?: string[]
  }
  interface IndexRouteProps {
    permission?: string[]
  }
}


