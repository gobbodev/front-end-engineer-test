interface OddButtonProps {
    value: number | null;
    label: string;
    highlight?: boolean;
  }
  
  export function OddButton({ value, label, highlight = false }: OddButtonProps) {
    const baseStyles = "flex flex-col items-center justify-center border rounded p-2 min-w-16 transition-colors";
    const normalStyles = "border-gray-700 hover:bg-laranja-escuro hover:text-branco";
    const highlightStyles = "border-laranja-escuro bg-laranja-escuro/10 text-laranja-claro";
  
    return (
      <button className={`${baseStyles} ${highlight ? highlightStyles : normalStyles}`}>
        <span className="text-xs text-gray-400">{label}</span>
        <span className="font-bold">{value ? value.toFixed(2) : 'not defined'}</span>
      </button>
    );
  }