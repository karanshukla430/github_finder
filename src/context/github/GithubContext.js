import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

//    GET DATA FOR SEARCH USERS
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text,
        })

        const response= await fetch(`${GITHUB_URL}/search/users?${params}`
        // ,{
        //     headers: {
        //         Authorization: `token ${GITHUB_TOKEN}`,
        //     },
        // }
        )
    
        const {items} = await response.json()
    
        dispatch({
            type: 'GET_USERS',
            payLoad: items,
        })
    }
    
    //Get Single User
    const getUser = async (login) => {
        setLoading()
       
        const response= await fetch(`${GITHUB_URL}/users/${login}`)

        if( response.status === 404 ){
            window.location = '/notfound'
        } else{
            const data = await response.json()
    
        dispatch({
            type: 'GET_USER',
            payLoad: data,
        })

        }
    }

    const getUserRepos = async (login) => {
        setLoading()
       
        const response= await fetch(`${GITHUB_URL}/users/${login}/repos`)

        if( response.status === 404 ){
            window.location = '/notfound'
        } else{
            const data = await response.json()
    
        dispatch({
            type: 'GET_USER_REPO',
            payLoad: data,
        })

        }
    }

    //Clear Users
    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS'
    })


    //SET LOADING
    const setLoading= () => dispatch({
        type: 'SET_LOADING'
    })

    return (
        <GithubContext.Provider
        value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            repos: state.repos,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
        }}
        >
        {children}
        </GithubContext.Provider>
        )
}

export default GithubContext