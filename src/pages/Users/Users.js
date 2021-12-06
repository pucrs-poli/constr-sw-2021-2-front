import { Person } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { Box } from "@mui/system";
import UserModal from '../../components/Users/UserModal';
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from '../../components/Spinner'
import UserTable from '../../components/Users/UserTable'
import React from 'react'
import { selectAllUsers, fetchUsers } from "./UserSlice";

import './Users.css';

export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const usersStatus = useSelector((state) => state.users.status)
  const error = useSelector((state) => state.users.error)

  const [searchInputValue, setSearchInputValue] = React.useState("")

  React.useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

    let content

    if (usersStatus === 'loading') {
        content = <Spinner text="Carregando usuários..." />
    } else if (usersStatus === 'succeeded') {
        content = <UserTable items={users}/>        
    } else if (usersStatus === 'failed') {
        content = <div>{error}</div>
    }

    const handleSearchBarValueChange = (event) => {
        if (event.target.value == "") {
            dispatch(fetchUsers());
        }
    }

    return (
        <div>
            <Box sx={{mt: 4}} class="users-content">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <div class="title">
                        <Person fontSize="large" style={{fill: "#647A79"}}/>
                        <Box sx={{ ml: 1 }}>
                            Usuários
                        </Box>
                    </div>

                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <InputBase
                            sx={{ mr: 1 }}
                            placeholder="Pesquisar"
                            inputProps={{
                                style:{
                                    backgroundColor: '#F2F2F2',
                                    color: "#647A79",
                                    borderRadius: '6px',
                                    padding: '7px 16px',
                                    width: '150px',
                                }
                            }}
                            onChange={handleSearchBarValueChange}
                        />
                        <UserModal/>
                    </Box>
                </Box>
                {content}
            </Box >
        </div>
    );
}