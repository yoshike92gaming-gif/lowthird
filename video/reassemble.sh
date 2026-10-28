#!/bin/sh
# Rebuilds the ProRes 4444 .mov from its parts (GitHub blocks single files > 100 MB)
cd "$(dirname "$0")" && sha256sum -c parts.sha256 && cat youtube_like_lowerthird_4k60_prores4444_alpha.mov.part* > youtube_like_lowerthird_4k60_prores4444_alpha.mov && sha256sum -c full.sha256
