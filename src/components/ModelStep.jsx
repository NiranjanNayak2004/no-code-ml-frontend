import { useState } from "react"
import API from "../api"

export default function ModelStep({ sessionId, onDone }) {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  async function train() {
    setLoading(true)
    setMsg("")

    try {
      await API.post("/train", {
        session_id: sessionId,
        model: "logistic"
      })

      setMsg("Training completed successfully ✅")
      onDone()
    } catch (e) {
      setMsg("Training failed. Please retry.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">4. Train Model</h2>

      <button
        onClick={train}
        disabled={loading}
        className={`px-4 py-2 rounded text-white transition
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"}
        `}
      >
        {loading ? "Training..." : "Train Logistic Regression"}
      </button>

      {msg && (
        <p className="mt-3 text-sm bg-slate-100 p-2 rounded">
          {msg}
        </p>
      )}
    </div>
  )
}
