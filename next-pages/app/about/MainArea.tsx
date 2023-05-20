'use client'

import React, { useState } from 'react'

export default function MainArea() {
  const [counter, setCounter] = useState(0)
  return (
    <div className="container mx-auto">
      <div>
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={() => setCounter((x) => x + 1)}
        >
          Add
        </button>

        <div className="pt-8">
          <div className="alert alert-info">
            <div>{counter}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
