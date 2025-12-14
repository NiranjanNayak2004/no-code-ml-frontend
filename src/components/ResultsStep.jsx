import { useEffect, useState } from "react"
import API from "../api"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function ResultsStep({ sessionId, resultsVersion }) {
  const [accuracy, setAccuracy] = useState(null)

  useEffect(() => {
    // 🔥 THIS WILL RUN AFTER TRAIN BUTTON
    API.get(`/results?session_id=${sessionId}`)
      .then(res => {
        setAccuracy(res.data.accuracy)
      })
  }, [sessionId, resultsVersion]) // 👈 THIS IS CRITICAL

  const data =
    accuracy !== null
      ? [{ name: "Accuracy", value: accuracy }]
      : []

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">5. Results</h2>

      {accuracy !== null ? (
        <>
          <p className="text-lg font-semibold text-green-700">
            Accuracy: {accuracy}
          </p>

          <div className="w-full h-64 mt-4">
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Train the model to see results</p>
      )}
    </div>
  )
}
