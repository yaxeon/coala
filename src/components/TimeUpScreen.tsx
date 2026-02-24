import Overlay from './Overlay';

interface Props {
  onRetry: () => void;
}

export default function TimeUpScreen({ onRetry }: Props) {
  return (
    <Overlay variant="warning">
      <h2 className="overlay__title">Time's Up!</h2>
      <p className="overlay__message">
        Not all koalas were found... Try again!
      </p>
      <button className="btn btn--primary" onClick={onRetry}>
        Try Again
      </button>
    </Overlay>
  );
}
