"use client"
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { useMutation } from "convex/react";
import { SignInButton } from "@clerk/nextjs";


export default function Home() {

  //use state to store the messages
  const messages = useQuery(api.functions.message.list);
  const createMessage = useMutation(api.functions.message.create);


  //const to set the input when user is typing the message
  const [input, setInput] = useState("");


  //function to send the message 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage({ sender: "Alice", content: input });
    setInput("");
  }

  return (
    <>
      <Authenticated>
        <div>


          {
            //map through the messages
            messages?.map((message, index) => (
              <div key={index}>
                <strong>{message.sender}</strong>: {message.content}
              </div>
            ))
          }

          <form onSubmit={handleSubmit}>
            <input type="text" name="message" id="message" value={input} onChange={e => setInput(e.target.value)} />
            <button type="submit">Send</button>
          </form>

        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  )
}
