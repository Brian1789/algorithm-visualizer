const visualization = document.getElementById('visualization');
const explanation = document.getElementById('explanation');
const complexity = document.getElementById('complexity');

function startVisualization() {
    const input = document.getElementById('arrayInput').value;
    let arr = input.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
    const algo = document.getElementById('algorithmSelect').value;
    if (arr.length === 0) {
        explanation.textContent = 'Please enter a valid array.';
        visualization.innerHTML = '';
        complexity.textContent = '';
        return;
    }
    if (algo === 'bubble') {
        visualizeBubbleSort(arr);
    } else {
        visualizeMergeSort(arr);
    }
}

function renderArray(arr, activeIndices = []) {
    visualization.innerHTML = '';
    const max = Math.max(...arr, 1);
    arr.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar' + (activeIndices.includes(idx) ? ' active' : '');
        bar.style.height = (val / max * 180 + 20) + 'px';
        bar.style.width = (100 / arr.length - 2) + '%';
        bar.textContent = val;
        visualization.appendChild(bar);
    });
}

async function visualizeBubbleSort(arr) {
    explanation.textContent = 'Bubble Sort: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.';
    complexity.textContent = 'Time Complexity: O(n²) | Space Complexity: O(1)';
    let a = arr.slice();
    renderArray(a);
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {
            renderArray(a, [j, j + 1]);
            await sleep(500);
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                renderArray(a, [j, j + 1]);
                await sleep(500);
            }
        }
    }
    renderArray(a);
    explanation.textContent += '\nSorted!';
}

async function visualizeMergeSort(arr) {
    explanation.textContent = 'Merge Sort: Divides the array into halves, sorts each half, and merges them back together.';
    complexity.textContent = 'Time Complexity: O(n log n) | Space Complexity: O(n)';
    let a = arr.slice();
    await mergeSortStep(a, 0, a.length - 1);
    renderArray(a);
    explanation.textContent += '\nSorted!';
}

async function mergeSortStep(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortStep(arr, left, mid);
    await mergeSortStep(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

async function merge(arr, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = arr.slice(left, mid + 1);
    let R = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        renderArray(arr, [k]);
        await sleep(500);
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    while (i < n1) {
        arr[k++] = L[i++];
        renderArray(arr, [k - 1]);
        await sleep(500);
    }
    while (j < n2) {
        arr[k++] = R[j++];
        renderArray(arr, [k - 1]);
        await sleep(500);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
