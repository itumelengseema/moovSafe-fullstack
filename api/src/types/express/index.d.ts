export {};

declare global {
  namespace Express {
    export interface Request {
      cleanBody?: any; // Add the cleanBody property to the Request interface
    }
  }
}
