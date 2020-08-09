import { ValidationError } from '../protocols/errors/validation-error';

export const withMiddlewares = ({ handler, middlewares = [] }) => (event, context, callback) => {
  const chainMiddlewares = ([firstMiddleware, ...restOfMiddlewares]: any[]) => {
    if (firstMiddleware) {
      return (e, c) => {
        try {
          return firstMiddleware(e, c, chainMiddlewares(restOfMiddlewares));
        } catch (error) {
          return Promise.reject(error);
        }
      };
    }

    return handler;
  };

  chainMiddlewares(middlewares)(event, context)
    .then((result) => callback(null, result))
    .catch((err) => {
      if (err instanceof ValidationError) {
        return callback(null, {
          statusCode: 422,
          body: err.message,
        });
      }

      console.error(err);

      callback(null, {
        statusCode: 500,
        body: err.message,
      });
    });
};
