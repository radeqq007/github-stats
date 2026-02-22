import { Chart } from 'chart.js/auto';
import ky from 'ky';
import { $, $computed, $new, $ref } from 'oberry';
import './style.css';
import { Profile, Repo } from './types/types';

const username = $ref<string>('')
const reposData = $ref<Repo[]>([])
const profileData = $ref<Profile>({
  login: '',
  id: 0,
  bio: '',
  avatar_url: '',
  followers: 0,
  following: 0
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Most used languages',
    },
  },
} as const

const chartBackgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
]

const chartBorderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

const mostLikedRepos = $computed(() => {
  return reposData().sort((a, b) => b.stargazers_count - a.stargazers_count)
})

const languageCounts = $computed(() => {
  const langs = reposData().map(r => r.language).filter(Boolean)
  return langs.reduce((acc, l) => { acc[l] = (acc[l] || 0) + 1; return acc }, {} as Record<string, number>)
})

const repoTypesCounts = $computed(() => {
  const types = reposData().map(r => r.fork ? 'Fork' : 'Source')
  return {
    Fork: types.filter(t => t === 'Fork').length,
    Source: types.filter(t => t === 'Source').length
  }
})

$('#username-input').bindInput(username)

$('#get-stats').on('click', async () => {
  const name = username()
  if (!name) return
  await fetchData(name)
})

async function fetchData(name: string) {
  const userResp = await ky.get(`https://api.github.com/users/${name}`).json() as Profile
  const reposResp = await ky.get(`https://api.github.com/users/${name}/repos?per_page=100`).json() as Repo[]

  profileData(userResp)
  reposData(reposResp)

  updateUI()
}

function updateUI() {
  $('#pfp').attr('src', profileData().avatar_url || '')
  $('#username').text(profileData().login || '')
  $('#bio').text(profileData().bio || '')
  $('#followers').text(profileData().followers.toString() || '0')
  $('#following').text(profileData().following.toString() || '0')

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
      .attr('target', '_blank'),

      $new('span')
        .text(`⭐ ${repo.stargazers_count}`)
        .class('text-xl text-gray-400')
    ).class('card w-full flex justify-between align-center hover:bg-zinc-700 hover:scale-101 transition-all')

    $('#liked-repos').append(repoElement)
  });

  const langChartCtx = ($('#languages-chart').elements[0] as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  new Chart(langChartCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(languageCounts()),
      datasets: [{
        data: Object.values(languageCounts()),
        backgroundColor: chartBackgroundColor,
        borderColor: chartBorderColor,
        borderWidth: 1
      }],
    },
    options: chartOptions
  })

  const types = reposData().map(repo => repo.fork ? 'Fork' : 'Source')
  const typeChartCtx = ($('#types-chart').elements[0] as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
  new Chart(typeChartCtx, {
    type: 'doughnut',
    data: {
      labels: ['Fork', 'Source'],
      datasets: [{
        data: [
          repoTypesCounts().Fork,
          repoTypesCounts().Source
        ],
        backgroundColor: chartBackgroundColor,
        borderColor: chartBorderColor,
        borderWidth: 1
      }],
    },
    options: chartOptions
  })
}
