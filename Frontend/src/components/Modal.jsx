import React from 'react'

export default function Modal({Modaltitle,handleChange,value,handleNoteSubmit}) {
  return (
   <>
   {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}
   <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header">
        <h1 class="modal-title fs-5 fw-bold" id="exampleModalLabel">{Modaltitle}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-floating">
  <textarea class="form-control h-100   "  id="floatingTextarea" onChange={handleChange} value={value}></textarea>
  <label for="floatingTextarea">Enter Notes</label>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn bg-black text-white"  onClick={handleNoteSubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
   
   </>
  )
}