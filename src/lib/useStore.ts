"use client"

import * as React from "react"
import {
  getTeam, getProducts, getJobs, getClients,
  type TeamMember, type Product, type Job, type HospitalClient,
} from "./store"

function useAsyncStore<T>(loader: () => Promise<T>, fallback: T): T {
  const [data, setData] = React.useState<T>(fallback)

  React.useEffect(() => {
    let mounted = true
    loader().then(res => {
      if (mounted) setData(res)
    })
    return () => { mounted = false }
  }, [loader]) // Assumes loader is stable

  return data
}

export function useTeam():     TeamMember[]    { return useAsyncStore(getTeam,     []) }
export function useProducts(): Product[]       { return useAsyncStore(getProducts, []) }
export function useJobs():     Job[]           { return useAsyncStore(getJobs,     []) }
export function useClients():  HospitalClient[] { return useAsyncStore(getClients,  []) }
