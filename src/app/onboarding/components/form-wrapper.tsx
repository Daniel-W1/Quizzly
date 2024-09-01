import { ReactNode } from "react"

type FormWrapperProps = {
  title: string
  description: string
  children: ReactNode
}

export function FormWrapper({ title, description, children }: FormWrapperProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-8">
      <h2 className="text-center mb-2 text-2xl font-medium custom-text-color">
        {title}
      </h2>
      <h4 className="text-center text-sm text-gray-500 mb-2 custom-text-color">
        {description}
      </h4>
      <div
        className="flex flex-col items-center justify-center w-screen max-w-md p-8 pb-4"
      >
        {children}
      </div>
    </div>
  )
}