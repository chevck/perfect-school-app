import { Copy, Mail } from "lucide-react";
import type { Exam } from "../utils/types";
import { toast } from "sonner";

export function ShareExaminationModal({ exam }: { exam: Exam | null }) {
  return (
    <div
      className='modal fade'
      id='share-examination-modal'
      tabIndex={-1}
      aria-labelledby='share-examination-modal-label'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title fs-5'
              id='share-examination-modal-label'
            >
              <h1>Share Examination</h1>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='__input-group'>
              <div className='form-group'>
                <label>Share Link</label>
                <input
                  type='text'
                  className='form-control'
                  value={`${window.location.origin}/take-exam/${exam?._id}`}
                />
              </div>
              <button
                className='button copy'
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/take-exam/${exam?._id}`
                  );
                  toast.success("Link copied to clipboard");
                }}
              >
                <Copy />
              </button>
            </div>
            <div className='__input-group'>
              <div className='form-group'>
                <label>Share via Email</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='student@example.com'
                />
              </div>
              <button className='button send'>
                <Mail width={16} height={16} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
