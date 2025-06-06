import Skeleton from "react-loading-skeleton";

export function LoadingPage() {
  return (
    <div className="loading-page psa_d_page">
      <div className="introduction">
        <Skeleton className="page-title" />
        <Skeleton className="page-description" />
        <div className="card-set">
          {[1, 2, 3].map((_, key) => (
            <div className="card_o" key={key}>
              <div className="details">
                <Skeleton className="card-content o-1" />
                <Skeleton className="card-content o-2" />
                <div className="o-3-container">
                  <Skeleton className="card-content o-3" />
                  <Skeleton className="card-content o-3-2" />
                </div>
              </div>
              <div className="icon-container">
                <Skeleton className="card-content icon" />
              </div>
            </div>
          ))}
        </div>
        <div className="card-set">
          <div className="card-big">
            <div className="card__header">
              <Skeleton className="title" />
            </div>
            <div className="card__body">
              <Skeleton className="card-content" />
              <Skeleton className="card-content" />
              <Skeleton className="card-content" />
              <Skeleton className="card-content" />
              <Skeleton className="card-content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
