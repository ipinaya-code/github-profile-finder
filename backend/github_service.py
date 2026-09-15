from collections import Counter

import httpx


GITHUB_API_URL = "https://api.github.com"


async def get_github_profile(username: str) -> dict:
	headers = {
		"Accept": "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"User-Agent": "github-profile-finder",
	}

	async with httpx.AsyncClient(timeout=10.0) as client:
		profile_response = await client.get(f"{GITHUB_API_URL}/users/{username}", headers=headers)

		if profile_response.status_code == 404:
			raise ValueError("El usuario de GitHub no existe.")
		profile_response.raise_for_status()

		repos_response = await client.get(
			f"{GITHUB_API_URL}/users/{username}/repos",
			params={"per_page": 100, "sort": "updated"},
			headers=headers,
		)
		repos_response.raise_for_status()

	profile_data = profile_response.json()
	repos_data = repos_response.json()

	language_counts = Counter(
		repo["language"] for repo in repos_data if repo.get("language")
	)
	top_repos = sorted(
		repos_data,
		key=lambda repo: (repo.get("stargazers_count", 0), repo.get("forks_count", 0)),
		reverse=True,
	)[:5]

	profile = {
		"avatar_url": profile_data.get("avatar_url"),
		"name": profile_data.get("name") or profile_data.get("login"),
		"login": profile_data.get("login"),
		"html_url": profile_data.get("html_url"),
		"bio": profile_data.get("bio") or "Sin biografía disponible.",
		"public_repos": profile_data.get("public_repos", 0),
		"followers": profile_data.get("followers", 0),
		"following": profile_data.get("following", 0),
	}

	return {
		"profile": profile,
		"languages": dict(language_counts),
		"top_repos": [
			{
				"name": repo.get("name"),
				"html_url": repo.get("html_url"),
				"language": repo.get("language") or "Sin lenguaje",
				"stargazers_count": repo.get("stargazers_count", 0),
			}
			for repo in top_repos
		],
	}
