import { Link } from 'react-router-dom';

export default function Notfound() {
    return (
      <>
        <h1 className="error-content">
          404 Not Found!!!
        </h1>
        <div className="back">
          <Link href="/trangchu" className="back-home">
            Trờ về trang chủ!
          </Link>
        </div>
      </>
    );
  }
