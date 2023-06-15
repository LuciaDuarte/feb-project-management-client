import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <h1>404</h1>

      <p>
        You discovered a new page! However, we don&apos;t have anything to show
        you here.
      </p>

      <Link to='/'>Let&apos;s go back to home?</Link>
    </div>
  );
};

export default Error;
