interface StoneCheckStatusProps {
  isChecking: boolean;
  result: string | null;
}

export const StoneCheckStatus = ({ isChecking, result }: StoneCheckStatusProps) => (
  <>
    {isChecking && (
      <div className="mb-4 p-3 bg-blue-900/50 border border-blue-700 text-blue-300 rounded-lg text-sm">
        🔍 Checking inscription type...
      </div>
    )}
    {result && (
      <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-700 text-yellow-300 rounded-lg text-sm">
        📊 Detection Result: {result}
      </div>
    )}
  </>
);