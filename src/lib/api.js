

const fetchServices = async () => {
  const response = await fetch('/api/services');
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
}

const fetchProjects = async () => {
  const response = await fetch('/api/projects');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

const fetchBlogs = async () => {
  const response = await fetch('/api/blog');
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
}
export { fetchServices, fetchProjects, fetchBlogs };