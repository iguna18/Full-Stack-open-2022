import anecdoteReducer from './reducers/anecdoteSlice'
// import {setAnecdotes} from './reducers/anecdoteSlice'
import deepFreeze from 'deep-freeze'
import anecdoteService from './service/anecdotes'

describe('anecdoteReducer', () => {
  test('returns new state with action anecdotes/create', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote', payload: {content:'anekdoti anekdotistvinao, glexi kacistvinao'},
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload.content)  })

  test('setAnectodes', ()=>{
    const state = []
    const action = {
      type: 'anecdotes/setAnecdotes', 
      payload: [
        {
          content:'aiaia',votes:0,id:'3342'
        },
        {
          content:'oia',votes:0,id:'2339'
        }
      ],
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(2)
    console.log(newState)
  })

  test('server test', async ()=>{
    let ret = await anecdoteService.addAnecdote({
      content:'jiijkjlk', id:98313, votes:0
    })
    expect(ret.content).toBeDefined()
    console.log(ret)
  })

  // test('returns new state with action notes/toggleImportanceOf', () => {
  //   const state = [
  //     {
  //       content: 'the app state is in redux store',
  //       important: true,
  //       id: 1
  //     },
  //     {
  //       content: 'state changes are made with actions',
  //       important: false,
  //       id: 2
  //     }]
  
  //   const action = {
  //     type: 'notes/toggleImportanceOf',      payload: 2    }
  
  //   deepFreeze(state)
  //   const newState = noteReducer(state, action)
  
  //   expect(newState).toHaveLength(2)
  
  //   expect(newState).toContainEqual(state[0])
  
  //   expect(newState).toContainEqual({
  //     content: 'state changes are made with actions',
  //     important: true,
  //     id: 2
  //   })
  // })
})