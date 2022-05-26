type Props = { title: string; disabled: boolean; link: string };

export const Panel: React.FC<Props> = ({ title, disabled, link, children }) => {
  return (
    <div>
      <div
        className={`relative p-4 max-w-2xl bg-slate-800 rounded sm:p-8 text-slate-200 ${
          disabled ? "pointer-events-none" : undefined
        }"`}
      >
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-bold leading-none">{title}</h5>
          <a
            href={link}
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            See reference docs
          </a>
        </div>
        <div className="flow-root">{children} </div>
        {disabled ? <div className="absolute inset-0 bg-black/50" /> : null}
      </div>
    </div>
  );
};
