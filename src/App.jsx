import { useState } from "react"
import UploadStep from "./components/UploadStep"
import PreprocessStep from "./components/PreprocessStep"
import SplitStep from "./components/SplitStep"
import ModelStep from "./components/ModelStep"
import ResultsStep from "./components/ResultsStep"

export default function App() {
  const [sessionId, setSessionId] = useState(null)
  const [columns, setColumns] = useState([])
  const [step, setStep] = useState(1)

  // 🔥 THIS IS THE KEY
  const [resultsVersion, setResultsVersion] = useState(0)

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-center">
          No-Code ML Pipeline Builder
        </h1>

        <UploadStep
          setSessionId={setSessionId}
          setColumns={setColumns}
          onDone={() => setStep(2)}
        />

        {step >= 2 && (
          <PreprocessStep
            sessionId={sessionId}
            columns={columns}
            onDone={() => setStep(3)}
          />
        )}

        {step >= 3 && (
          <SplitStep
            sessionId={sessionId}
            onDone={() => setStep(4)}
          />
        )}

        {step >= 4 && (
          <ModelStep
            sessionId={sessionId}
            onDone={() => {
              setStep(5)
              // 🔥 FORCE RESULTS REFRESH
              setResultsVersion(v => v + 1)
            }}
          />
        )}

        {step >= 5 && (
          <ResultsStep
            sessionId={sessionId}
            resultsVersion={resultsVersion}
          />
        )}

      </div>
    </div>
  )
}
