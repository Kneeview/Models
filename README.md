# Kneeview

An interactive web-based 3D viewer for patient-specific knee bone geometries, providing open access to a comprehensive dataset of 80 segmented knee MRI scans for finite element modeling and biomechanical research.

## Overview

Finite element modeling is pivotal for understanding knee biomechanics, but its potential is often constrained by data availability. While the Osteoarthritis Initiative (OAI) provides invaluable imaging data, researchers still face the bottleneck of converting these images into usable simulations. Existing benchmarks like OpenKnee are valuable, but restricted by unstructured meshes and low subject count (n=8).

**Kneeview** addresses this gap by providing:
- **80 patient-specific bone geometries** (.stl files) of the Femur, Tibia, Patella, and Fibula
- **Interactive 3D visualization** directly in the browser
- **High-quality automated segmentation** with validated accuracy metrics
- **Future expansion** to include structured Abaqus meshes with topological consistency

## Dataset Details

### Data Source
- **80 T2 fat-saturated knee MRI scans** from Hospital Del Mar, Barcelona (2017-2024)
- Final repository: **80 subjects**
- **320 STL files** (4 bones per patient)

### Segmentation Pipeline
- **nnUNet deep learning model** trained on 35 expert annotations
- Verified by musculoskeletal-specialized radiologist
- Post-processing using 3D Slicer's marching cubes algorithm
- Automatic artifact removal and quality control

### Validation Metrics
Performance on hold-out test dataset (15 volumes):

**Overall Metrics:**
- **DICE**: 0.9855 ± 0.0010
- **IOU**: 0.9713 ± 0.0020
- **HD95**: 14.4637 ± 12.7269

**Per-Class Metrics:**
- **Femur**: DICE 0.9896 ± 0.0011, IOU 0.9794 ± 0.0022, HD95 1.2259 ± 0.0833
- **Tibia**: DICE 0.9836 ± 0.0018, IOU 0.9678 ± 0.0034, HD95 16.4872 ± 14.2195
- **Patella**: DICE 0.9693 ± 0.0019, IOU 0.9405 ± 0.0035, HD95 2.1452 ± 0.1190
- **Fibula**: DICE 0.9629 ± 0.0030, IOU 0.9287 ± 0.0055, HD95 2.2268 ± 0.6385

## Features

- **Interactive 3D Viewer**: Built on MeshLabJS framework with Three.js rendering
- **Real-time Visualization**: View and manipulate knee bone geometries in your browser
- **Color-coded Bones**:
  - Femur (Red)
  - Tibia (Blue)
  - Fibula (Green)
  - Patella (Orange)
- **Patient Selection**: Browse through 80 different patient geometries
- **Download Access**: Direct access to STL files for research use

## Usage

### Viewing Models Online
Visit the live viewer at your deployment URL and:
1. Select a patient ID (K001-K080)
2. Interact with the 3D model using mouse controls
3. Apply various rendering and visualization filters

### Downloading Data
1. Review the citation requirements in the Downloads modal
2. Accept the terms of use
3. Access the complete dataset

## Roadmap

Future developments include:
- **Structured FEM meshes** for all 80 subjects
- **Bayesian Coherent Point Drift morphing** for topology-consistent meshes
- **Soft tissue templates** with bone-specific morphing and interpolation
- **Population-level analysis tools**

## Citation

If you use this dataset in your research, please cite:

```
R. Janssen, S. Natarajan, F. Chemorion, I. Radalov, M. A. G. Ballester, and J. Noaílly,
"Kneeview: An open-source repository of patient-specific knee geometries and structured meshes,"
Zenodo, 2024. DOI: 10.5281/zenodo.17805176.
```

## Acknowledgements

This research study was co-funded by:
- The European Union under a Horizon Europe MSCA Joint Doctoral Network (Grant No. 101169278)
- The European Research Council (ERC-2021-CoG-O-Health-101044828)
- The Spanish Ministry of Science, Innovation, and Universities project STRATO (PID2021-126469OB-C21)

Views and opinions expressed are those of the author(s) only and do not necessarily reflect those of the European Union or the European Research Executive Agency (REA). Neither the European Union nor the REA can be held responsible for them.

## Contributors

See the Contributions section in the web interface for detailed contributor information and links.

**Institutions:**
1. Universitat Pompeu Fabra, Barcelona, Spain
2. ICREA, Barcelona, Spain
3. Department of Radiology, Hospital Del Mar, Barcelona, Spain

## Technology Stack

- **Mesh Processing**: VCG Library (compiled to asm.js via Emscripten)
- **3D Rendering**: Three.js
- **Framework**: MeshLabJS
- **Segmentation**: nnUNet deep learning framework
- **Post-processing**: 3D Slicer

## License

See LICENSE file for details.

## Issues and Support

For issues, bugs, or feature requests, please file an issue in the GitHub repository.

---

*Developed by the Computational Biology and Biomedical Systems group at Universitat Pompeu Fabra*
