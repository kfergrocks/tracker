import Header from '../components/Header';
export default function ErrorPage() {
  return [
    <Header key="header" />,
    <div className="row mt-5" key="error">
      <div className="col-4"></div>
      <div className="col-4">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
      <div className="col-4"></div>
    </div>,
  ];
}
