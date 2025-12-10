export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm">
    {message}
  </div>
);