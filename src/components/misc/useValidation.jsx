export default function useValidation(errors, field) {
    return errors?.[field]?.length && errors[field].map((error, index) => (
      <div key={index} className="bg-danger p-2 text-red-400 rounded my-1">
          { error }
      </div>
    ))
  }