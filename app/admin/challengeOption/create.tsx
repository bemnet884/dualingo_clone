import { Create, SimpleForm, ReferenceInput, TextInput, required, NumberInput, BooleanInput } from "react-admin"


export const CreateChallengeOption = () => {
  return (
    <Create >
      <SimpleForm>
        <TextInput
          source="text"
          validate={[required()]}
          label="Text"
        />
        <BooleanInput source="correct" label="Correct option" />
        <ReferenceInput
          source="challengeId"
          reference="challenges"
        />
        <TextInput
          source="imageSrc"
          label="Image URL"
        />
        <TextInput
          source="audioSrc"
          label="audio URL"
        />
      </SimpleForm>
    </Create>
  )
}