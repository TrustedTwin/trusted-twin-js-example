import { Spinner } from "./Spinner";

type Props = { onClick: () => void; loading: boolean };

export const QueryButton: React.FC<Props> = ({
  onClick,
  loading,
  children,
}) => {
  return loading ? (
    <button
      type="button"
      className="text-gray-700 bg-primary-500 cursor-not-allowed font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center whitespace-nowrap"
      disabled
    >
      <Spinner size="w-4 h-4" />
      request in progress...
    </button>
  ) : (
    <button
      className={`text-black hover:text-white bg-primary-500 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
