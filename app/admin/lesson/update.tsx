import { Edit, SimpleForm, ReferenceInput, TextInput, required, NumberInput } from "react-admin"


export const UpdateLesson = () => {
  return (
    <Edit >
      <SimpleForm>
        <TextInput
          source="title"
          validate={[required()]}
          label="Title"
        />
        <ReferenceInput
          source="unitId"
          reference="units"
        />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Edit>
  )
}