import React from "react";
import Particles from "react-particles-js";

export default function MyParticleJS(): JSX.Element {
	return (
		<Particles
			width="100vw"
			style={{ background: "#0C0D17", opacity: "0.5", position: "absolute", zIndex: "-10" }}
			height="100vh"
			params={{
				"particles": {
					"number": {
						"value": 400,
						"density": {
							"enable": true,
							"value_area": 1500
						}
					},
					"line_linked": {
						"enable": true,
						"opacity": 0.02
					},
					"move": {
						"direction": "right",
						"speed": 0.05
					},
					"size": {
						"value": 1,
						random: {
							enable: true,
							minimumValue: 0.8
						}
					},
					"opacity": {
						"anim": {
							"enable": true,
							"speed": 1,
							"opacity_min": 0.05
						}
					}
				},
				"interactivity": {
					"events": {
						"onclick": {
							"enable": true,
							"mode": "push",
						}
					},
					"modes": {
						"push": {
							"particles_nb": 1
						}
					}
				},
				"retina_detect": true
			}}
		/>
	);
}