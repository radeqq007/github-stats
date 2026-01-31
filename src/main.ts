import { Chart } from 'chart.js/auto';
import ky from 'ky';
import { $, $computed, $new, $ref } from 'oberry';
import './style.css';

const username = $ref('')
const reposData = $ref([])
const profileData = $ref({})

const mostLikedRepos = $computed(() => {
  return reposData().sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5)
})

$('#username-input').bindInput(username)

$('#get-stats').on('click', async () => {
  const name = username()
  if (!name) return
  await fetchData(name)
})

async function fetchData(name) {
  const userResp = await ky.get(`https://api.github.com/users/${name}`).json()
  const reposResp = await ky.get(`https://api.github.com/users/${name}/repos?per_page=100`).json()

  profileData(userResp)
  reposData(reposResp)

  updateUI()
}

function updateUI() {
  $('#pfp').attr('src', profileData().avatar_url || '')
  $('#username').text(profileData().login || '')
  $('#bio').text(profileData().bio || '')
  $('#followers').text(profileData().followers || 0)
  $('#following').text(profileData().following || 0)

  $('#liked-repos').children().remove()

  mostLikedRepos().forEach((repo, i) => {
    const repoElement = $new('div',
      $new('a', 
        $new('h4')
          .text(`${i + 1}. ${repo.name}`)
          .class('font-bold text-2xl'),

        $new('h5')
          .text(repo.description ? repo.description : 'No description')
          .class('text-lg italic text-gray-300')
      )
      .class('flex flex-col gap-2')
      .attr('href', repo.html_url)
      .attr('target', '_blank')
    ).class('bg-zinc-800/60 backdrop-blur-xs w-full px-10 py-8 rounded-lg flex justify-between align-center hover:bg-zinc-700 hover:scale-101 transition-all')

    $('#liked-repos').append(repoElement)
  });
}