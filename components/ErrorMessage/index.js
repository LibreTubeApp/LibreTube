import styles from './styles';

/**
 * Takes a GraphQL mutation error and spits out an error message.
 * Falls back to printing the error as a string if it is not a
 * GraphQL error.
 */
export default ({ error, message }) => {
  if (!error) return null;
  if (!Array.isArray(error.graphQLErrors)) {
    return (
      <div className="error-box" role="alert">
        <style jsx>{styles}</style>
        {message}
        {`${error}`}
      </div>
    );
  }

  return (
    <div className="error-box" role="alert">
      <style jsx>{styles}</style>
      {message}
      <ul>
        {error.graphQLErrors.map((innerError, index) => (
          <li key={index}>{innerError.message}</li>
        ))}
      </ul>
    </div>
  );
};
