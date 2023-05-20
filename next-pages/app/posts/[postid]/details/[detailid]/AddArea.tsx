import { generateCustomer } from '../../../../../lib'

export default function AddArea() {
  async function handleClick() {
    'use server'
    await generateCustomer()
  }

  return (
    <div className="pt-4">
      {/* @ts-expect-error */}
      <form action={handleClick}>
        <button type="submit" className="btn btn-primary btn-sm btn-wide">
          Generate
        </button>
      </form>
    </div>
  )
}
