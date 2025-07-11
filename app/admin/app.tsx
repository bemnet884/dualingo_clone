import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

import { CourseList } from './course/list'
import { CreateCourse } from './course/create'
import { UpdateCourse } from './course/update'

import { UnitList } from './unit/list'
import { CreateUnit } from './unit/create'
import { UpdateUnit } from './unit/update'

import { LessonList } from './lesson/list'
import { CreateLesson } from './lesson/create'
import { UpdateLesson } from './lesson/update'

import { ChallengeList } from './challenge/list'
import { CreateChallenge } from './challenge/create'
import { UpdateChallenge } from './challenge/update'

import { ChallengeOptionList } from './challengeOption/list'
import { CreateChallengeOption } from './challengeOption/create'
import { UpdateChallengeOption } from './challengeOption/update'
import CustomLayout from './MyLayout'


const dataProvider = simpleRestProvider('/api')

const App = () => {
  return (
    <Admin dataProvider={dataProvider} layout={CustomLayout}>
      <Resource
        name='courses'
        list={CourseList}
        create={CreateCourse}
        edit={UpdateCourse}
        recordRepresentation="title"
      />
      <Resource
        name='units'
        list={UnitList}
        create={CreateUnit}
        edit={UpdateUnit}
        recordRepresentation="title"
      />
      <Resource
        name='lessons'
        list={LessonList}
        create={CreateLesson}
        edit={UpdateLesson}
        recordRepresentation="title"
      />
      <Resource
        name='challenges'
        list={ChallengeList}
        create={CreateChallenge}
        edit={UpdateChallenge}
        recordRepresentation="question"
      />
      <Resource
        name='challengeOptions'
        list={ChallengeOptionList}
        create={CreateChallengeOption}
        edit={UpdateChallengeOption}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
      />
    </Admin>
  )
}

export default App
