
type ErrorMessageProp={
    Text: string
}
export const ErrorMessage = ({Text}:ErrorMessageProp) => {
  return (
    <div className="flex items-center max-w-md p-4 space-x-4 border border-rose-400 rounded bg-rose-200">
        <svg aria-hidden="true" focusable="false" width="20" height="20" className="shrink-0 rounded-full bg-white"><use /></svg>
        <p className="text-rose-800 text-sm leading-tight">{Text}</p>
    </div>
  )
}
