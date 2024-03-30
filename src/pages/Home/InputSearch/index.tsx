import React, { useCallback } from "react"
import debounce from "@/utils/debounce"
import { UserProps } from "@/pages/Home/hooks/useLoadData"
import classes from "./style.module.scss"


interface Props {
  inputValue: string
  setInputValue: (e: string) => void
  setUsers: (user: UserProps[]) => void
  users: UserProps[]
}

export default function InputSearch(props: Props) {
  const handleChange = useCallback(
    (text: string) => {
      props.setUsers(
        props.users?.filter((user) => {
          return user.username.toLowerCase().includes(text.toLowerCase())
        }),
      )
    },
    [props.users, props.setUsers],
  )

  const searchUser = useCallback(debounce(handleChange, 500), [
    props.users,
    props.setUsers,
    props.inputValue,
  ])
  return (

    <div className={classes.wave_group}>
      <input
        value={props.inputValue}
        onChange={(e) => {
          searchUser(e.target.value)
          props.setInputValue(e.target.value)
        }}
        className={classes.input}
        placeholder={"Search people by username"}
      />
      <span className={classes.bar}></span>
      <label className={classes.label}>
        <span className={classes.label_char}>N</span>
        <span className={classes.label_char}>a</span>
        <span className={classes.label_char}>m</span>
        <span className={classes.label_char}>e</span>
      </label>
    </div>

  )
}
