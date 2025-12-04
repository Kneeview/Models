# Kneeview

An interactive web-based 3D viewer for patient-specific knee bone geometries, providing open access to a comprehensive dataset of 81 segmented knee MRI scans for finite element modeling and biomechanical research.

## Overview

Finite element modeling is pivotal for understanding knee biomechanics, but its potential is often constrained by data availability. While the Osteoarthritis Initiative (OAI) provides invaluable imaging data, researchers still face the bottleneck of converting these images into usable simulations. Existing benchmarks like OpenKnee are valuable, but restricted by unstructured meshes and low subject count (n=8).

**Kneeview** addresses this gap by providing:
- **81 patient-specific bone geometries** (.stl files) of the Femur, Tibia, Patella, and Fibula
- **Interactive 3D visualization** directly in the browser
- **High-quality automated segmentation** with validated accuracy metrics
- **Future expansion** to include structured Abaqus meshes with topological consistency

## Dataset Details

### Data Source
- **93 T2 fat-saturated knee MRI scans** from Hospital Del Mar, Barcelona (2017-2024)
- **38 male, 55 female patients**
- Final repository: **81 subjects** (after excluding subjects with missing demographics)
- **324 STL files** (4 bones per patient)

### Segmentation Pipeline
- **nnUNet deep learning model** trained on 35 expert annotations
- Verified by musculoskeletal-specialized radiologist
- Post-processing using 3D Slicer's marching cubes algorithm
- Automatic artifact removal and quality control

### Validation Metrics
Performance on hold-out test dataset (15 volumes):
- **Dice Coefficient**: 0.986 ± 0.001
- **Intersection over Union (IOU)**: 0.971 ± 0.002
- **Hausdorff Distance (HD95)**: 14.464 ± 12.727
  - Femur, Patella, Fibula: HD95 = 1.46 ± 0.242
  - Tibia: HD95 = 16.49 ± 14.22 (variance from distal artifacts)

## Features

- **Interactive 3D Viewer**: Built on MeshLabJS framework with Three.js rendering
- **Real-time Visualization**: View and manipulate knee bone geometries in your browser
- **Color-coded Bones**:
  - Femur (Red)
  - Tibia (Blue)
  - Fibula (Green)
  - Patella (Orange)
- **Patient Selection**: Browse through 81 different patient geometries
- **Download Access**: Direct access to STL files for research use

## Usage

### Viewing Models Online
Visit the live viewer at your deployment URL and:
1. Select a patient ID (K001-K081)
2. Interact with the 3D model using mouse controls
3. Apply various rendering and visualization filters

### Downloading Data
1. Review the citation requirements in the Downloads modal
2. Accept the terms of use
3. Access the complete dataset

## Roadmap

Future developments include:
- **Structured FEM meshes** for all 81 subjects
- **Bayesian Coherent Point Drift morphing** for topology-consistent meshes
- **Soft tissue templates** with bone-specific morphing and interpolation
- **Population-level analysis tools**

## Citation

If you use this dataset in your research, please cite:

```
[Citation to be added - placeholder for Kneeview publication]
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
