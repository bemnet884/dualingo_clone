import { Create, SimpleForm, ReferenceInput, TextInput, required, NumberInput, SelectInput } from "react-admin"


export const CreateChallenge = () => {
  return (
    <Create >
      <SimpleForm>
        <TextInput
          source="question"
          validate={[required()]}
          label="Question"
        />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT"
            },
            {
              id: "ASSIST",
              name: "ASSIST"
            },
          ]}
          validate={[required()]}
        />
        <ReferenceInput
          source="lessonId"
          reference="lessons"
        />
        <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
        />
      </SimpleForm>
    </Create>
  )
}