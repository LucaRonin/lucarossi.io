const formatDate = dateString => new Date(Date.parse(dateString)).toLocaleString(`en-GB`, { day: `2-digit`, month: `short`, year: `numeric` })

export { formatDate }
