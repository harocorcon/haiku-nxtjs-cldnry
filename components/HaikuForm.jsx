"use client"

import { useActionState, useState } from "react"
import { createHaiku, editHaiku } from "../actions/haikuController"
import { CldUploadWidget } from "next-cloudinary"

export default function HaikuForm(props){
  let actualAction = props.action === "create"? createHaiku: editHaiku;

    const [formState, formAction] = useActionState(actualAction, {})
    const [signature, setSignature] = useState("")
    const [public_id, setPublic_id] = useState("")
    const [version, setVersion] = useState("")

    return (
        <form action={formAction} className="max-w-xs mx-auto">
            <div className="mb-3">
                <input defaultValue={props.haiku?.line1} name="line1" autoComplete="off" type="text" placeholder="Line #1" className="input input-bordered w-full max-w-xs" />
                {formState.errors?.line1 && (
                    <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState.errors?.line1}</span>
                  </div>
                )}
            </div>
            <div className="mb-3">
                <input defaultValue={props.haiku?.line2} name="line2" autoComplete="off" type="text" placeholder="Line #2" className="input input-bordered w-full max-w-xs" />
                {formState.errors?.line2 && (
                    <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState.errors?.line2}</span>
                  </div>
                )}
            </div>
            <div className="mb-3">
                <input defaultValue={props.haiku?.line3} name="line3" autoComplete="off" type="text" placeholder="Line #3" className="input input-bordered w-full max-w-xs" />
                {formState.errors?.line3 && (
                    <div role="alert" className="alert alert-error">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formState.errors?.line3}</span>
                  </div>
                )}
            </div>
            <div className="mb-4">
              <CldUploadWidget 
                onSuccess={(result,{widget}) => {
                  console.log(result?.info)
                  setSignature(result?.info.signature)
                  setPublic_id(result?.info.public_id)
                  setVersion(result?.info.version)
                }}
                onQueuesEnd={(result, {widget}) => {
                  widget.close()
                }} 
                signatureEndpoint="/widget-signature"
              >
                {({ open }) => {
                  function handleClick(e){
                    e.preventDefault()
                    open()
                  }
                  return (
                    <button className="btn btn-secondary" onClick={handleClick}>
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>

            <input type="hidden" name="public_id" value={public_id} />
            <input type="hidden" name="version" value={version} />
            <input type="hidden" name="signature" value={signature} />

            <input type="hidden" name="haikuId" defaultValue={props.haiku?._id.toString()} />
            <button className="btn btn-primary">Submit</button>
        </form>
    )
}