import Button from '../button/Button';
import './paginator.css';

const Paginator = ({
  backDisabled,
  nextDisabled,
  setBack,
  setNext,
}: {
  backDisabled: boolean;
  nextDisabled: boolean;
  setBack: () => void;
  setNext: () => void;
}) => {
  return (
    <div className="paginator">
      <Button variant="outline" onClick={setBack} disabled={backDisabled}>
        Anterior
      </Button>
      <Button variant="outline" onClick={setNext} disabled={nextDisabled}>
        Siguiente
      </Button>
    </div>
  );
};

export default Paginator;
