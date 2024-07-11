import React from 'react'

function Processes({children}) {
  return (
    <div className=''>
        <div className='min-w-full inline-block align-middle'>
            <table className="min-w-full divide-y divide-neutral-500">
                <thead>
                    <tr>
                        <th scope='col' className='text-xs text-neutral-200'>Name</th>
                        <th scope='col' className='text-xs text-neutral-200'>Ram</th>
                    </tr>
                </thead>
                  {children}
            </table>
        </div>
    </div>
  )
}

export default Processes